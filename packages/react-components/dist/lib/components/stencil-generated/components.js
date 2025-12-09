'use client';
import { createComponent } from '@stencil/react-output-target/runtime';
import React from 'react';
import { CotButton as CotButtonElement, defineCustomElement as defineCotButton } from "stencil-components/dist/components/cot-button.js";
import { CotTextbox as CotTextboxElement, defineCustomElement as defineCotTextbox } from "stencil-components/dist/components/cot-textbox.js";
import { MyComponent as MyComponentElement, defineCustomElement as defineMyComponent } from "stencil-components/dist/components/my-component.js";
export const CotButton = createComponent({
    tagName: 'cot-button',
    elementClass: CotButtonElement,
    react: React,
    events: {},
    defineCustomElement: defineCotButton
});
export const CotTextbox = createComponent({
    tagName: 'cot-textbox',
    elementClass: CotTextboxElement,
    react: React,
    events: {},
    defineCustomElement: defineCotTextbox
});
export const MyComponent = createComponent({
    tagName: 'my-component',
    elementClass: MyComponentElement,
    react: React,
    events: {},
    defineCustomElement: defineMyComponent
});
//# sourceMappingURL=components.js.map