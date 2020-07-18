import { mount } from '@vue/test-utils'
import Url from '@/components/Url.vue'

const url = 'https://some-urls'
const creationDate = '2020-07-18'
const wrapper = mount(Url, {
    propsData: {
        url,
        creationDate
    }
})

describe('Url.vue', () => {
    it('should render', () => {
        expect(wrapper.isVueInstance).toBeTruthy()
        expect(wrapper.find('.url').text()).toContain(url)
        expect(wrapper.find('.date').text()).toContain(creationDate)
    })
})
