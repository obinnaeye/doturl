import App from '@/App.vue'
import { mount, Wrapper } from '@vue/test-utils'
import UrlShortener from '@/components/UrlShortener.vue'
import Url from '@/components/Url.vue'
import ShortUrls from '@/api/ShortUrls'

jest.mock('@/api/ShortUrls')

const urls = [
    {shortUrl: 'https://some-short-url1', createdAt: '2020-07-18'},
    {shortUrl: 'https://some-short-url2', createdAt: '2020-07-20'}
]
const emittedUrl = {shortUrl: 'https://some-short-url3', createdAt: '2020-07-21'}
let mockGetUrls = jest.fn(() => new Promise<Object>((resolve, reject) => {
    resolve({
        urls
    })
}))
ShortUrls.getUrls = mockGetUrls as any

const status = 200;
let mockShortenUrl = jest.fn((url) => new Promise<Object>((resolve, reject) => {
    resolve({
        url: emittedUrl,
        status
    })
}))
ShortUrls.shortenUrl = mockShortenUrl as any

let wrapper: Wrapper<any>;

describe("App.vue", () => {
    beforeEach(() => {
        wrapper = mount(App, {
            data() {
                return {
                    urls: [],
                    shortUrl: ''
                }
            }
        })
    });

    it("should render with all child components", () => {
        expect(wrapper.findComponent(UrlShortener).exists()).toBeTruthy()
        expect(wrapper.findAllComponents(Url).length).toBe(2)
    })

    it('should call onNewUrl when newUrl is emitted', async () => {
        wrapper.findComponent(UrlShortener).find('button').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.findAllComponents(Url).length).toBe(3)
    })

})
