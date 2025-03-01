export function formatVND(amount) {
  amount = Number(amount);
  const formattedAmount = amount.toLocaleString("vi-VN");
  return `${formattedAmount} VNĐ`;
}
