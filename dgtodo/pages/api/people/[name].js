export default function handler(req, res) {
  const { name } = req.query;

  // Veritabanından veya başka bir kaynaktan kullanıcı bilgilerini alın
  const user = {
    name: name,
    email: `${name}@example.com`,
    // Diğer kullanıcı bilgilerini buraya ekleyin
  };

  res.status(200).json(user);
}
