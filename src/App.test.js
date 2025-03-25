// src/App.test.js
import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App.vue', () => {
  it('updates banner text when input changes', async () => {
    const wrapper = mount(App);
    const textInput = wrapper.find('#bannerText');
    await textInput.setValue('New Horizon');
    expect(wrapper.vm.bannerText).toBe('New Horizon');
    expect(wrapper.find('h1').text()).toBe('New Horizon');
  });

  it('updates background color', async () => {
    const wrapper = mount(App);
    const colorInput = wrapper.find('#bgColor');
    await colorInput.setValue('#ff0000');
    expect(wrapper.vm.bgColor).toBe('#ff0000');
    expect(wrapper.element.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });
});