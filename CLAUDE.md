

# Mahalla xizmatlari avtomatizatsiyasi

Men ushbu loyihada mahalla xizmatlarini avtomatlashtirishni istayman.

# Muammo

Mening uyimda elektr bo'yicha muammo bor. Men bizga qarashli **JEK** ga murojaat qilishim kerak. Odatda ularning ofisiga boraman yoki qo'ng'iroq qilishim kerak. Ammo bazan qo'ng'iroqqa javob berishmaydi. Yoki men issiqda u yerga tushishni istamayman. Shuning uchun onlayn yechim qilishni istayman.

# Yechim

JEK hodimlari har bir apartment va honadon uchun login va parol generatsiya qiladi. Uyda yashovchilar o'sha login parol bilan app ga kiradilar va buyurtma qoldiradi. Unda buyurtma turi (elektrik, santexnik, usta, vahokzo), izoh qoldiradi. Texnik jihatdan esa order_date va order_status qo'shilishi kerak. Status default holdatda **open**, **closed**, **cancelled** bo'ladi. JEK hodimi (admin) statusni faqat **cancelled** qila oladi. Buyurtmachi esa faqat **close** qila oladi.

# Role
admin - JEK hodimi (bir dona bo'ladi) hard code.
user - honadonda yashovchi har qanday shaxs.

# UI

/dashboard page da admin buyurtmalarni ko'ra oladi, va birortasini **cancel** qila oladi. Masalan uy egasining qarzi borligi uchun.
/create-user page da admin yangi honadon qo'sha oladi. Unda apartment raqami va honadon raqami umumiy login hisoblanadi. Masalan 21_169 - bu 21-apartment 169-honadon.
/orders page da honadon (user) eski buyurtmalarini ko'radi. Shu page header qismida yoki boshqa joyda **new Order** button bilan yangi buyurtma qoldiradi. Mavjudlarini esa **closed** ga o'girishi mumkin.

# Texnik talablar
Database uchun boshlanishiga oddiy JSON fayl based.
Auth kerak emas, shunchaki if-else qilinadi.
Frontend + Backend bitta NextJS ning o'zida bo'lishi kerak.
Web da O'zbekcha/Russcha interfeys bo'lishi kerak.
