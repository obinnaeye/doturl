import { mount } from '@vue/test-utils'
import Alert from '@/components/Alert.vue'

describe('Alert.vue', () => {
    const url = 'http://some-url'
    const wrapper = mount(Alert, {
        propsData: {
            url
        }
    })
    it('should render with supplied props', () => {
        expect(wrapper.find('h4').text()).toMatch("Your shortened Url is here:")
        expect(wrapper.find('button').text()).toMatch("Copy")
        const inputField: HTMLInputElement = wrapper.find('input').element as HTMLInputElement
        const value = inputField.value
        expect(value).toMatch(url)
    })

    it('should call copyUrl when on click', () => {
        const spyFunc = jest.fn();
        Object.defineProperty(document, 'execCommand', { value: spyFunc });
        wrapper.find('button').trigger('click')
        expect(spyFunc).toHaveBeenCalled()
    })
})
