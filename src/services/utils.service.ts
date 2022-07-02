export class UtilsService {
	formattingNumber = (n, d = 0) => n.toLocaleString('en', { minimumFractionDigits: d, maximumFractionDigits: d });
	copyToClipboard = text => text && window.navigator.clipboard.writeText(text.toString());
}
