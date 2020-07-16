export {};
import { Request, Response } from 'express';
const crypto = require('crypto');
const ShortUrl = require('../models/shortUrl')
const Count = require('../models/count')
class Controller {
    static async getUrls(req: Request, res: Response) {
        const urls: Array<Object> = await ShortUrl.find();
        res.status(200).send({ urls });
    }

    static async shortenUrl(req: Request, res: Response) {
        const counter = await Count.findOne({_id: 'count_id'})
        const count: Number = counter ? counter.count : 0
        if (!counter) {
            const counter = new Count({
                _id: 'count_id'
            })
            counter.save()
        }
        const { url } = req.body;
        // TODO: Validation url 
        if (!url) {
            res.status(200).send({error: "Please provide a valid url"})
            return
        }
        const existingUrl = await ShortUrl.findOne({ originalUrl: url }, (err: Error, shortUrl) => {});
        if (existingUrl) {
            res.status(201).send({ url: existingUrl });
        } else {
            const baseUrl: String = ' https://pbid.io/'
            const key: Buffer = crypto.pbkdf2Sync('secret', `somesalt${count}`, 100000, 4, 'sha512');
            const randString: String = key.toString('hex')
            const shortUrl = new ShortUrl({
                originalUrl: url,
                shortUrl: `${baseUrl}${randString}`,
              });
            shortUrl.save((err, url) => {
                res.status(200).send({ url });
            });
        }
    }
}

module.exports = Controller


// curl --header "Content-Type: application/json" \
//   --request POST \
//   --data '{"url":"https://www.someurl.come/you/you"}' \
//   http://localhost:3001/api/shorten
