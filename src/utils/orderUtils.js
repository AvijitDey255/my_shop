import { STORE_CONFIG } from '../data/storeConfig';

/**
 * Format order text cleanly
 */
export function formatOrderSummary(itemsText, customerName, customerPhone, customerAddress) {
  const cleanItems = itemsText.trim();
  const nameStr = customerName.trim() || 'Not specified';
  const phoneStr = customerPhone.trim() || 'Will share on WhatsApp/Call';
  const addressStr = customerAddress.trim() || 'Will share location on chat';
  const dateStr = new Date().toLocaleString();

  return `*NEW GROCERY LIST ORDER - ${STORE_CONFIG.name}*
----------------------------------------
*Order Time:* ${dateStr}

*Required Grocery Items:*
${cleanItems}

----------------------------------------
*Customer Details:*
• Name: ${nameStr}
• Contact Phone: ${phoneStr}
• Delivery Address: ${addressStr}
• Delivery Charge: ${STORE_CONFIG.deliveryFee}
----------------------------------------
_Hello ${STORE_CONFIG.name}, please check item availability, pack them, and confirm the order for free home delivery._`;
}

/**
 * Send order via WhatsApp
 */
export function sendWhatsAppOrder(itemsText, customerName, customerPhone, customerAddress, customTargetPhone) {
  const formattedMsg = formatOrderSummary(itemsText, customerName, customerPhone, customerAddress);
  const targetPhone = (customTargetPhone && customTargetPhone.trim()) 
    ? customTargetPhone.replace(/\D/g, '') 
    : STORE_CONFIG.phone;
  
  const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(formattedMsg)}`;
  window.open(url, "_blank");
}

/**
 * Send order via Email (mailto link or window.location)
 */
export function sendEmailOrder(itemsText, customerName, customerPhone, customerAddress, recipientEmail = STORE_CONFIG.email) {
  const subject = `Grocery Order List - ${customerName.trim() || 'Customer'} (${new Date().toLocaleDateString()})`;
  const bodyText = formatOrderSummary(itemsText, customerName, customerPhone, customerAddress).replace(/\*/g, '');
  
  const mailtoUrl = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  window.location.href = mailtoUrl;
}

/**
 * Download order list as a formatted file (.txt or .csv)
 */
export function downloadOrderFile(itemsText, customerName, customerPhone, customerAddress, fileType = 'txt') {
  let content = '';
  let filename = `Grocery_Order_${Date.now()}`;
  let mimeType = 'text/plain';

  if (fileType === 'csv') {
    filename += '.csv';
    mimeType = 'text/csv';
    content = `Item / Detail,Value\n`;
    content += `"Store","${STORE_CONFIG.name}"\n`;
    content += `"Customer Name","${customerName.replace(/"/g, '""') || 'N/A'}"\n`;
    content += `"Customer Phone","${customerPhone.replace(/"/g, '""') || 'N/A'}"\n`;
    content += `"Delivery Address","${customerAddress.replace(/"/g, '""') || 'N/A'}"\n`;
    content += `"Delivery Fee","${STORE_CONFIG.deliveryFee}"\n\n`;
    content += `"GROCERY ITEMS LIST",\n`;
    
    // Split items into lines for CSV
    const lines = itemsText.split('\n');
    lines.forEach((line, idx) => {
      if (line.trim()) {
        content += `"${idx + 1}","${line.replace(/"/g, '""').trim()}"\n`;
      }
    });
  } else {
    filename += '.txt';
    content = formatOrderSummary(itemsText, customerName, customerPhone, customerAddress).replace(/\*/g, '');
  }

  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Native Share API for mobile / desktop
 */
export async function shareOrderNative(itemsText, customerName, customerPhone, customerAddress) {
  const text = formatOrderSummary(itemsText, customerName, customerPhone, customerAddress).replace(/\*/g, '');
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Grocery Order - ${STORE_CONFIG.name}`,
        text: text,
      });
      return true;
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
      return false;
    }
  }
  return false;
}

/**
 * Copy order text to clipboard
 */
export async function copyOrderToClipboard(itemsText, customerName, customerPhone, customerAddress) {
  const text = formatOrderSummary(itemsText, customerName, customerPhone, customerAddress).replace(/\*/g, '');
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}
