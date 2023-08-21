import React from 'react';
import SimpleReactFooter from 'simple-react-footer';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  const description =
    '“Come unto me, all ye that labour and are heavy laden, and I will give you rest. “Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. “For my yoke is easy, and my burden is light” (Matthew 11:28–30). The rest we give is not as glorious like His, but we make sure that you wish for it.';
  const title = 'Find Rest';

  const columns = [
    {
      title: '',
      resources: [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Gallery', link: 'gallery' },
      ],
    },
    {
      title: '',
      resources: [
        { name: 'SignUp', link: '/signup' },
        { name: 'Login', link: '/login' },
        { name: 'Logout', link: '/item5' },
      ],
    },
    {
      title: 'Visit us',
      resources: [
        { name: 'Email: mochochokoBoiketlo@gmail.com' },
        { name: 'Number: 0734157351' },
        { name: 'Location: Chriss Harny Road' },
      ],
    },
  ];

  return (
    <div >
      <SimpleReactFooter
        description={description}
        title={title}
        columns={columns}
        icon={<FaGithub />}
      />
    </div>
  );
};

export default Footer;
