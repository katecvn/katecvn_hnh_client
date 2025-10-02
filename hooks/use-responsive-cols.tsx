import { useEffect, useState } from 'react';

export const useResponsiveCols = ({
  lgCol,
  mdCol,
  smCol,
  xsCol,
}: {
  lgCol: number;
  mdCol: number;
  smCol: number;
  xsCol: number;
}) => {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth >= 1024) {
        setCols(lgCol); // lg
      } else if (window.innerWidth >= 768) {
        setCols(mdCol); // md
      } else if (window.innerWidth >= 576) {
        setCols(smCol); // sm
      } else {
        setCols(xsCol); // mobile
      }
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, [lgCol, mdCol, smCol, xsCol]);

  return cols;
};
