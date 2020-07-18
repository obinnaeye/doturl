import { mocked } from 'ts-jest/utils'
import Controllers from '../../src/controllers/Controller'
const Count = require('../../src/models/count')
const ShortUrl = require('../../src/models/shortUrl')

jest.mock('../../src/models/count')
jest.mock('../../src/models/shortUrl')

let res = {} as any;
res.status = jest.fn((code) => {
  return { send: jest.fn((msg) => {}) };
}) as any;

const req = {
    body: {
        url: "http://some-impotant-urls.com/hjkl;lkjhafad"
    },
} as any;

Count.mockReturnValue({save: jest.fn()})
Count.findOne = jest.fn(() => {
    return 2
})

let urls = [{url1: 'some kind of urls'}, {url2: 'another kind of urls'}]
ShortUrl.mockReturnValue({ save: jest.fn((err, url) => {
        res.status(200).send({ url: urls[0] })
    })
});
ShortUrl.find = jest.fn(() => {
  return urls;
});
ShortUrl.findOne = jest.fn(() => {
    return urls[0]
})


describe('Controllers.getUrls', () => {
    afterEach(() => {
      res.status.mockClear();
      ShortUrl.find.mockClear();
      ShortUrl.findOne.mockClear();
      Count.findOne.mockClear();
      Count.mockClear();
      ShortUrl.mockClear();
    });

    describe('getUrls', () => {
        test('should respond with the appropriate status code', () => {
            Controllers.getUrls(req, res).then(() => {
                expect(res.status).toHaveBeenCalledTimes(1);
                expect(res.status).toHaveBeenCalledWith(200);
            })
        })
        test('should send the urls', () => {
            Controllers.getUrls(req, res).then(() => {
                expect(res.status.mock.results[0].value.send).toHaveBeenCalledWith({ urls });
            })
        })
    })

    describe('shortenUrl', () => {
        describe('case when there is existing shortened url', () => {
            test('should respond with the appropriate status code of 201', () => {
                Controllers.shortenUrl(req, res).then(() => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                    expect(res.status).toHaveBeenCalledWith(201);
                })
            })
            test('should send the urls', () => {
                Controllers.shortenUrl(req, res).then(() => {
                    expect(res.status.mock.results[0].value.send)
                        .toHaveBeenCalledWith({ url: urls[0] });
                })
            })
        })

        describe('case when there is no existing shortened url', () => {
            test('should respond with the appropriate status code of 200', () => {
                Count.findOne.mockReturnValue(0)
                ShortUrl.findOne.mockReturnValue(null)
                Controllers.shortenUrl(req, res).then(() => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                    expect(res.status).toHaveBeenCalledWith(200);
                    expect(Count.mock.results[0].value.save).toHaveBeenCalledTimes(1)
                    expect(ShortUrl.mock.results[0].value.save).toHaveBeenCalledTimes(1)
                })
            })
            test('should send the new url', () => {
                Controllers.shortenUrl(req, res).then(() => {
                    expect(res.status.mock.results[0].value.send)
                        .toHaveBeenCalledWith({ url: urls[0] });
                })
            })
        })

        describe('case when no url is supplied in the req.body', () => {
            test('should respond with the appropriate status code of 200', () => {
                req.body.url = ''
                Controllers.shortenUrl(req, res).then(() => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                    expect(res.status).toHaveBeenCalledWith(200);
                    expect(Count.findOne).not.toHaveBeenCalled()
                })
            })
            test('should send the error message', () => {
                const err = { "error": "Please provide a valid url" }
                Controllers.shortenUrl(req, res).then(() => {
                    expect(res.status.mock.results[0].value.send)
                        .toHaveBeenCalledWith(err);
                })
            })
        })
    })
})
