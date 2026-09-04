// document.addEventListener('DOMContentLoaded', () => {
//   const addToCartForm = document.querySelector('product-form form');
//   if (!addToCartForm) return;

//   addToCartForm.addEventListener('submit', async (e) => {
//     const giftWrapCheckBox = document.getElementById('enable_gift_wrap');
//     if (!giftWrapCheckBox || !giftWrapCheckBox.checked) return;

//     e.preventDefault();
//     e.stopImmediatePropagation();

//     const mainVariantId = addToCartForm.querySelector('[name="id"]').value;
//     const mainQuantity = parseInt(addToCartForm.querySelector('[name="quantity"]')?.value || 1, 10);
//     const giftWrapVariantId = Number(giftWrapCheckBox.dataset.variantId);

//     if (!giftWrapVariantId) {
//       console.error('Gift wrap variant ID missing — check the metaobject reference.');
//       return;
//     }

//     const payload = {
//       items: [
//         { id: Number(mainVariantId), quantity: mainQuantity },
//         { id: giftWrapVariantId, quantity: 1 }
//       ]
//     };

//     try {
//       const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         console.error('Cart add failed:', data);
//         return;
//       }

//       const sectionsRes = await fetch(
//         `${window.Shopify.routes.root}?sections=cart-drawer,cart-icon-bubble`
//       );
//       const sections = await sectionsRes.json();
//       const parser = new DOMParser();

//       // --- Cart Drawer: extract the <cart-drawer> element's inner content ---
//       const drawerDoc = parser.parseFromString(sections['cart-drawer'], 'text/html');
//       const newDrawerInner = drawerDoc.querySelector('cart-drawer')?.innerHTML;
//       const liveDrawer = document.querySelector('cart-drawer');
//       if (newDrawerInner && liveDrawer) {
//         liveDrawer.innerHTML = newDrawerInner;
//       }

//       // --- Cart Icon Bubble: extract the section wrapper's inner content ---
//       const bubbleDoc = parser.parseFromString(sections['cart-icon-bubble'], 'text/html');
//       const newBubbleInner = bubbleDoc.getElementById('shopify-section-cart-icon-bubble')?.innerHTML;
//       const liveBubble = document.getElementById('cart-icon-bubble');
//       if (newBubbleInner && liveBubble) {
//         liveBubble.innerHTML = newBubbleInner;
//       }

//       // Open the drawer now that it's populated
//       liveDrawer?.open();

//     } catch (err) {
//       console.error('Network error:', err);
//     }
//   }, true); // capture phase — takes priority over Dawn's own product-form.js listener
// });
