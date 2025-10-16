export const getImageUrl = (path) => {
  if (!path) return null;

  // ✅ Si ya es blob o base64, usar directo
  if (path.startsWith("blob:") || path.startsWith("data:")) return path;

  // ✅ Si ya es URL completa
  if (path.startsWith("http")) return path;

  // ✅ Caso backend (ruta relativa)
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
};
