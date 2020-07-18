import { mount, Wrapper } from '@vue/test-utils'
import UrlShortener from '@/components/UrlShortener.vue'
import Alert from '@/components/Alert.vue'
import ShortUrls from '@/api/ShortUrls'
jest.mock('@/api/ShortUrls')

const newUrl = 'http://some-url/new'
const status = 200;
const emittedUrl = {shortUrl: 'https://some-short-url3', createdAt: '2020-07-21'}
let mockShortenUrl = jest.fn((url) => new Promise<Object>((resolve, reject) => {
    resolve({
        url: emittedUrl,
        status
    })
}))
ShortUrls.shortenUrl = mockShortenUrl as any


const url = 'http://some-url'
let wrapper: Wrapper<any>;
describe('UrlShortener.vue', () => {
    beforeEach(() => {
        wrapper = mount(UrlShortener, {
            data() {
                return {
                    url
                }
            }
        })
    })
    afterEach(() => {
        mockShortenUrl.mockClear()
    })

    it('should render with child components', () => {
        const inputField: HTMLInputElement = wrapper.findComponent(Alert).find('input').element as HTMLInputElement
        const value = inputField.value
        expect(value).toMatch(url)
        expect(wrapper.findComponent(Alert).exists()).toBe(true)
    })

    it('should call shortenUrl when "Shorten URL" button is clicked', () => {
        wrapper.find('button').trigger('click')
        expect(mockShortenUrl).toHaveBeenCalled()
    })

    it('should emit "newUrl" if status is 200', async () => {
        wrapper.find('button').trigger('click')
        expect(mockShortenUrl).toHaveBeenCalled()
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted().newUrl).toBeTruthy()
    })

    it('should not emit "newUrl" if status is 201', async () => {
        mockShortenUrl.mockReturnValue(new Promise<Object>((resolve, reject) => {
            resolve({
                url: url,
                status: 201
            })
        }))
        ShortUrls.shortenUrl = mockShortenUrl as any
        wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        expect(mockShortenUrl).toHaveBeenCalled()
        expect(wrapper.emitted().newUrl).toBeUndefined()
    })
})
