'use client';
import { CotButton as CotButtonElement, defineCustomElement as defineCotButton } from "@mng/stencil-components/dist/components/cot-button.js";
import { CotTextbox as CotTextboxElement, defineCustomElement as defineCotTextbox } from "@mng/stencil-components/dist/components/cot-textbox.js";
import { MyComponent as MyComponentElement, defineCustomElement as defineMyComponent } from "@mng/stencil-components/dist/components/my-component.js";
import { createComponent } from '@stencil/react-output-target/runtime';
import React from 'react';
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