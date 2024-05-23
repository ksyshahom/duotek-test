const navLinks = [
  {
    label: 'Тендеры',
    href: '#',
    children: [
      { as: 'button', label: 'Добавить тендер', href: '#' },
      { label: 'Каталог тендеров', href: '#' },
      { as: 'divider', label: 'divider' },
      { label: 'Работа с клиентами', href: '#' },
      { label: 'Управление проектами', href: '#' },
      { label: 'Маркетинг', href: '#' },
      { label: 'Финансы', href: '#' },
      { label: 'Управление бизнесом', href: '#' }
    ]
  },
  {
    label: 'Компании',
    to: { name: 'company-list' },
    children: [
      { as: 'button', secondary: true, label: 'Добавить компанию', href: '#' },
      { label: 'Рейтинги', href: '#' },
      { label: 'Отраслевая специализация', href: '#' },
      { as: 'divider', label: 'divider' },
      { label: 'Интеграторы', href: '#' },
      { label: 'Решения для бизнеса крепеж', href: '#' },
      { label: 'Разработка сайтов', href: '#' },
      { label: 'Мобильные приложения', href: '#' },
      { label: 'Онлайн-реклама', href: '#' },
      { label: 'Контент', href: '#' }
    ]
  },
  {
    label: 'Продукты',
    href: '#',
    children: [
      { label: 'Рейтинги', href: '#' },
      { label: 'По отраслям', href: '#' },
      { as: 'divider', label: 'divider' },
      { label: 'Работа с клиентами', href: '#' },
      { label: 'Управление проектами', href: '#' },
      { label: 'Маркетинг', href: '#' },
      { label: 'Финансы', href: '#' },
      { label: 'Управление бизнесом', href: '#' }
    ]
  },
  {
    label: 'Кейсы',
    href: '#',
    children: [
      { label: 'Автоматизация сантехников', href: '#' },
      { label: 'Автоматизация клининга', href: '#' },
      { label: 'Автоматизация СТО', href: '#' },
      { label: 'Автоматизация сантехников', href: '#' },
      { label: 'Автоматизация клининга', href: '#' },
      { label: 'Автоматизация СТО', href: '#' }
    ]
  }
]

const socialLinks = [
  {
    label: 'facebook',
    href: 'https://www.facebook.com/',
    img: {
      src: '/img/socials/facebook.svg',
      size: { width: 24, hight: 25 }
    }
  },
  {
    label: 'вконтакте',
    href: 'https://vk.com/',
    img: {
      src: '/img/socials/vk.svg',
      size: { width: 24, hight: 25 }
    }
  },
  {
    label: 'youtube',
    href: 'https://www.youtube.com/',
    img: {
      src: '/img/socials/youtube.svg',
      size: { width: 25, hight: 25 }
    }
  }
]

export const footerLinks = {
  nav: navLinks,
  social: socialLinks
}
