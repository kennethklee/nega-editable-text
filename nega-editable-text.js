import {LitElement, html} from 'lit-element';
/**
Inline plain text editing component.

Example:

```
Basic text: <nega-editable-text editable>This can be editable</nega-editable-text>

Custom element text: <nega-editable-text editable><span>This text is in a <code>span</code> block.</nega-editable-text>
```

@element nega-editable-text
@demo demo/index.html
*/
/**
 * `nega-editable-text`
 * Inline plain text editing component
 *
 * @customElement
 * @demo demo/index.html
 */
class NegaEditableText extends  LitElement {
  static get properties() {
    return {
      editable: {type: Boolean, reflect: true},
      readOnly: {type: Boolean, reflect: true}
    }
  }

  constructor() {
    super()
    this.readOnly = false
    this.editable = false
    
    this._bound = {}  // Keep reference of bound event handlers for disconnect
  }

  render() {
    return html`
    <slot id="text" @slotchange=${this._handleSlotChange}><span id="default"></span></slot>
    `
  }

  /**
   * Input element getter
   */
  get contentElement() {
    if (this._textEl) return this._textEl;  // Cache
    if (!this.hasUpdated) return;  // No shadow root, no element to use

    var slotInputList = this.shadowRoot.getElementById('text').assignedElements()
    this._textEl = slotInputList.length ? slotInputList[0] : this.shadowRoot.getElementById('default')
    return this._textEl
  }

  firstUpdated() {
    this._bound.onPaste = this._handleTextPaste.bind(this)

    this.contentElement.addEventListener('paste', this._bound.onPaste)
  }

  disconnectedCallback() {
    if (!this.contentElement) return // no events to remove
    this.contentElement.removeEventListener('paste', this._bound.onPaste)
  }

  updated(changed) {
    if (changed.has('editable') || changed.has('readOnly')) {
      (this.editable && !this.readOnly) ? this.edit() : this.doneEditing()
    }
  }

  /**
   * Edit the text.
   */
  edit() {
    if (this.readOnly) return;
    if (!this.contentElement) return;
    
    // Allow focusable
    if (this.contentElement.hasAttribute('tabIndex')) {
      this._textTabIndex = this.contentElement.tabIndex
    }
    this.contentElement.tabIndex = 0
    this.contentElement.contentEditable = true
    this.editable = true

    this.dispatchEvent(new CustomEvent('edit', {detail: {value: this.innerText, target: this.contentElement}, composed: true, bubbles: true}))
  }

  /**
   * Finished editing.
   */
  doneEditing() {
    // Restore focusable
    if (this._textTabIndex) {
      this.contentElement.tabIndex = this._textTabIndex
    } else {
      this.contentElement.removeAttribute('tabindex')
    }    
    this.contentElement.blur()
    this.contentElement.contentEditable = false
    this.editable = false

    this.dispatchEvent(new CustomEvent('change', {detail: {value: this.innerText, target: this.contentElement}, composed: true, bubbles: true}))
  }

  _handleSlotChange(ev) {
    if (this.contentElement.innerHTML !== this.contentElement.innerText) {
      this.contentElement.innerHTML = this.contentElement.innerText // Strip nested tags
    }
  }

  // Source (with adjustments): https://stackoverflow.com/a/34876744
  _handleTextPaste(ev) {
    ev.preventDefault()
    var text = ''
    if (ev.clipboardData || ev.originalEvent.clipboardData) {
      text = (ev.originalEvent || ev).clipboardData.getData('text/plain')
    } else if (window.clipboardData) {
      text = window.clipboardData.getData('Text')
    }
    var insertCommand = document.queryCommandSupported('insertText') ? 'insertText' : 'paste'
    document.execCommand(insertCommand, false, text)
    return false
  }
}
window.customElements.define('nega-editable-text', NegaEditableText);
