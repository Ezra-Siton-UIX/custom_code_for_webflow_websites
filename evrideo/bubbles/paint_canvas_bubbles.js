
export function paint_canvas_bubbles() {
  // 🎨 custom code under

  // https://cdn.jsdelivr.net/gh/Ezra-Siton-UIX/custom_code_for_webflow_websites@main/evrideo/css/evrideo_custom_styles.css?1 *//

  const white_BUBBLE_COLOR = '102, 126, 234'; // RGB בלבד, לא rgba
  const BUBBLE_COLOR = '117, 89, 255'; // RGB בלבד, לא rgba
  const BUBBLE_BLUR = 25; // px
  const BUBBLE_OPACITY = 0.6 // from 0 to 1;
  const second_addColorStop = 0.9; // from 0.5 to 1 - higher you get bigger bubble

  // בוחרים את כל האלמנטים עם סימבול Webflow
  const blogWrappers = document.querySelectorAll('[blog_canvas]');

  blogWrappers.forEach(wrapper => {
    // יוצרים canvas אם אין
    let canvas = wrapper.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      wrapper.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');

    function drawBubble() {
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // רדיוס גדול ככל האפשר מבלי לשבור את העיגול
      const radius = Math.min(canvas.width, canvas.height) / 2 * 0.95;

      // gradient רדיאלי
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, `rgba(${BUBBLE_COLOR}, ${BUBBLE_OPACITY})`);
      gradient.addColorStop(second_addColorStop, `rgba(${BUBBLE_COLOR}, 0)`);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // שמירה על הקנבס
      ctx.save();

      // חיתוך לעיגול
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      // בלור + ציור gradient
      const blur = Math.min(BUBBLE_BLUR, radius / 2); // לא יותר מחצי הרדיוס
      ctx.filter = `blur(${blur}px)`;
      ctx.fillStyle = gradient;
      // מצייר מלבן שמכסה את העיגול
      ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

      // איפוס filter ושחזור
      ctx.filter = 'none';
      ctx.restore();
    }

    // ציור ראשוני
    drawBubble();

    // עדכון רספונסיבי אם ההורה משתנה
    window.addEventListener('resize', drawBubble);
  });

}



