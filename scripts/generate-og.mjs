import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

const projectDir = process.cwd();

async function generate() {
  console.log('Generating OpenGraph assets...');

  const size = 400;
  const person = await sharp(path.join(projectDir, 'public/images/KT_profilie_fading_reverse.png'))
    .extract({ left: 70, top: 10, width: 820, height: 820 })
    .resize(size, size)
    .toBuffer();

  const circleMask = Buffer.from(
    '<svg width="' + size + '" height="' + size + '"><circle cx="' + (size / 2) + '" cy="' + (size / 2) + '" r="' + (size / 2) + '" fill="#ffffff"/></svg>'
  );

  const bg = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 220, b: 108, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  const composited = await sharp(bg)
    .composite([{ input: person, top: 0, left: 0 }])
    .toBuffer();

  const circularAvatarBuffer = await sharp(composited)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const avatarBase64 = circularAvatarBuffer.toString('base64');

  const bricolageFont = fs.readFileSync(path.join(projectDir, 'typefaces/Bricolage_Grotesque/static/BricolageGrotesque_36pt-Bold.ttf')).toString('base64');
  const bricolageRegular = fs.readFileSync(path.join(projectDir, 'typefaces/Bricolage_Grotesque/static/BricolageGrotesque_36pt-Regular.ttf')).toString('base64');
  const ibmPlexMono = fs.readFileSync(path.join(projectDir, 'typefaces/IBM_Plex_Mono/IBMPlexMono-Bold.ttf')).toString('base64');
  const beVietnamLight = fs.readFileSync(path.join(projectDir, 'typefaces/Be_Vietnam_Pro/BeVietnamPro-Light.ttf')).toString('base64');
  const beVietnamBold = fs.readFileSync(path.join(projectDir, 'typefaces/Be_Vietnam_Pro/BeVietnamPro-Bold.ttf')).toString('base64');

  const html = '<!DOCTYPE html>' +
'<html>' +
'<head>' +
'<meta charset="utf-8">' +
'<style>' +
'  @font-face {' +
'    font-family: "BricolageHeading";' +
'    src: url(data:font/truetype;charset=utf-8;base64,' + bricolageRegular + ') format("truetype");' +
'    font-weight: 400;' +
'  }' +
'  @font-face {' +
'    font-family: "BricolageHeading";' +
'    src: url(data:font/truetype;charset=utf-8;base64,' + bricolageFont + ') format("truetype");' +
'    font-weight: 700;' +
'  }' +
'  @font-face {' +
'    font-family: "IBMMono";' +
'    src: url(data:font/truetype;charset=utf-8;base64,' + ibmPlexMono + ') format("truetype");' +
'    font-weight: 700;' +
'  }' +
'  @font-face {' +
'    font-family: "VietnamBody";' +
'    src: url(data:font/truetype;charset=utf-8;base64,' + beVietnamLight + ') format("truetype");' +
'    font-weight: 300;' +
'  }' +
'  @font-face {' +
'    font-family: "VietnamBody";' +
'    src: url(data:font/truetype;charset=utf-8;base64,' + beVietnamBold + ') format("truetype");' +
'    font-weight: 700;' +
'  }' +
'  * { box-sizing: border-box; margin: 0; padding: 0; }' +
'  body {' +
'    width: 1200px;' +
'    height: 630px;' +
'    background-color: #121212;' +
'    overflow: hidden;' +
'    font-family: "VietnamBody", sans-serif;' +
'    color: #FFFFFF;' +
'    position: relative;' +
'    -webkit-font-smoothing: antialiased;' +
'  }' +
'  .ambient-glow {' +
'    position: absolute;' +
'    top: -50px;' +
'    right: 30px;' +
'    width: 650px;' +
'    height: 550px;' +
'    background: radial-gradient(circle at 70% 35%, rgba(0, 220, 108, 0.14) 0%, rgba(0, 220, 108, 0.03) 50%, rgba(18, 18, 18, 0) 75%);' +
'    pointer-events: none;' +
'  }' +
'  .card-container {' +
'    width: 1200px;' +
'    height: 630px;' +
'    padding: 64px 84px;' +
'    display: flex;' +
'    flex-direction: column;' +
'    justify-content: space-between;' +
'    position: relative;' +
'    z-index: 10;' +
'  }' +
'  .grid-layout {' +
'    display: grid;' +
'    grid-template-columns: 635px 397px;' +
'    column-gap: 48px;' +
'    row-gap: 52px;' +
'    align-items: start;' +
'  }' +
'  .tag-gold {' +
'    font-family: "IBMMono", monospace;' +
'    font-size: 17px;' +
'    font-weight: 700;' +
'    color: #C6A85B;' +
'    letter-spacing: 0.02em;' +
'    margin-bottom: 18px;' +
'  }' +
'  .name-heading {' +
'    font-family: "BricolageHeading", sans-serif;' +
'    font-size: 88px;' +
'    font-weight: 400;' +
'    line-height: 1.04;' +
'    letter-spacing: -0.03em;' +
'    color: #FFFFFF;' +
'  }' +
'  .right-header {' +
'    display: flex;' +
'    align-items: flex-start;' +
'    justify-content: space-between;' +
'    gap: 20px;' +
'    padding-top: 42px;' +
'  }' +
'  .role-title {' +
'    font-family: "BricolageHeading", sans-serif;' +
'    font-size: 32px;' +
'    font-weight: 700;' +
'    color: #FFFFFF;' +
'    letter-spacing: -0.02em;' +
'    margin-bottom: 12px;' +
'    white-space: nowrap;' +
'  }' +
'  .badge-row {' +
'    display: flex;' +
'    align-items: center;' +
'    gap: 12px;' +
'    flex-wrap: nowrap;' +
'  }' +
'  .exp-text {' +
'    font-family: "VietnamBody", sans-serif;' +
'    font-size: 16px;' +
'    font-weight: 700;' +
'    color: #00DC6C;' +
'    white-space: nowrap;' +
'  }' +
'  .remote-pill {' +
'    display: inline-flex;' +
'    align-items: center;' +
'    gap: 7px;' +
'    background: rgba(255, 255, 255, 0.05);' +
'    border: 1px solid rgba(255, 255, 255, 0.2);' +
'    border-radius: 9999px;' +
'    padding: 3px 12px;' +
'    font-size: 12px;' +
'    color: rgba(255, 255, 255, 0.85);' +
'    font-weight: 400;' +
'    white-space: nowrap;' +
'  }' +
'  .remote-dot {' +
'    width: 7px;' +
'    height: 7px;' +
'    border-radius: 50%;' +
'    background-color: #00DC6C;' +
'    box-shadow: 0 0 8px rgba(0, 220, 108, 0.8);' +
'  }' +
'  .avatar-wrap {' +
'    width: 114px;' +
'    height: 114px;' +
'    border-radius: 50%;' +
'    background-color: #00DC6C;' +
'    border: 2.5px solid #00DC6C;' +
'    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);' +
'    flex-shrink: 0;' +
'    overflow: hidden;' +
'  }' +
'  .avatar-wrap img {' +
'    width: 100%;' +
'    height: 100%;' +
'    object-fit: cover;' +
'    display: block;' +
'  }' +
'  .paragraph-text {' +
'    font-family: "VietnamBody", sans-serif;' +
'    font-size: 15.5px;' +
'    font-weight: 300;' +
'    line-height: 1.65;' +
'    color: rgba(255, 255, 255, 0.8);' +
'    max-width: 635px;' +
'  }' +
'  .cta-group {' +
'    display: flex;' +
'    align-items: center;' +
'    gap: 8px;' +
'    padding-top: 4px;' +
'  }' +
'  .cta-btn {' +
'    height: 54px;' +
'    background-color: #00DC6C;' +
'    color: #000000;' +
'    font-family: "VietnamBody", sans-serif;' +
'    font-size: 16px;' +
'    font-weight: 700;' +
'    padding: 0 32px;' +
'    border-radius: 12px;' +
'    display: flex;' +
'    align-items: center;' +
'    justify-content: center;' +
'    letter-spacing: -0.01em;' +
'    box-shadow: 0 8px 24px rgba(0, 220, 108, 0.2);' +
'  }' +
'  .cta-icon-box {' +
'    width: 54px;' +
'    height: 54px;' +
'    border-radius: 12px;' +
'    background: #FFFFFF;' +
'    display: flex;' +
'    align-items: center;' +
'    justify-content: center;' +
'    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);' +
'  }' +
'  .cta-icon-box svg {' +
'    width: 22px;' +
'    height: 22px;' +
'    stroke: #000000;' +
'    stroke-width: 2.5;' +
'    fill: none;' +
'    stroke-linecap: round;' +
'    stroke-linejoin: round;' +
'  }' +
'</style>' +
'</head>' +
'<body>' +
'  <div class="ambient-glow"></div>' +
'  <div class="card-container">' +
'    <div class="grid-layout">' +
'      <div>' +
'        <div class="tag-gold">Portfolio</div>' +
'        <h1 class="name-heading">Khanhtruong<br>Nguyen</h1>' +
'      </div>' +
'      <div class="right-header">' +
'        <div>' +
'          <h2 class="role-title">Product Designer</h2>' +
'          <div class="badge-row">' +
'            <span class="exp-text">3,5 years exp</span>' +
'            <div class="remote-pill">' +
'              <span class="remote-dot"></span>' +
'              Available for Remote' +
'            </div>' +
'          </div>' +
'        </div>' +
'        <div class="avatar-wrap">' +
'          <img src="data:image/png;base64,' + avatarBase64 + '" alt="Khanhtruong Nguyen">' +
'        </div>' +
'      </div>' +
'      <div>' +
'        <p class="paragraph-text">' +
'          UX/UI designer with 3.5 years shipping complex B2B products — IoT ecosystems, SaaS dashboards, and whitelabel platforms built to scale across partners. I use AI tools to close the gap between design and production. Currently open to remote roles.' +
'        </p>' +
'      </div>' +
'      <div>' +
'        <div class="cta-group">' +
'          <div class="cta-btn">Explore now</div>' +
'          <div class="cta-icon-box">' +
'            <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' +
'          </div>' +
'        </div>' +
'      </div>' +
'    </div>' +
'  </div>' +
'</body>' +
'</html>';

  const tempHtmlPath = path.join(projectDir, 'public/images/.og-card.html');
  fs.writeFileSync(tempHtmlPath, html);

  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const ogImgPath = path.join(projectDir, 'public/images/og-image.png');

  const cmd = '"' + chromePath + '" --headless=new --screenshot="' + ogImgPath + '" --window-size=1200,630 --hide-scrollbars --virtual-time-budget=1000 "file://' + tempHtmlPath + '"';
  execSync(cmd);
  if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);

  fs.copyFileSync(ogImgPath, path.join(projectDir, 'src/app/opengraph-image.png'));
  fs.copyFileSync(ogImgPath, path.join(projectDir, 'src/app/twitter-image.png'));

  const avatarSize = 600;
  const circleSize = 480;
  const circleAvatar = await sharp(circularAvatarBuffer)
    .resize(circleSize, circleSize)
    .toBuffer();

  const squareBg = await sharp({
    create: {
      width: avatarSize,
      height: avatarSize,
      channels: 4,
      background: { r: 18, g: 18, b: 18, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  const squareAvatarBuffer = await sharp(squareBg)
    .composite([{ input: circleAvatar, top: 60, left: 60 }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(projectDir, 'public/images/og-image-square.png'), squareAvatarBuffer);
  fs.writeFileSync(path.join(projectDir, 'public/images/avatar.png'), squareAvatarBuffer);

  const appleIcon = await sharp(squareAvatarBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(projectDir, 'src/app/apple-icon.png'), appleIcon);

  console.log('All OpenGraph and thumbnail assets successfully generated!');
}

generate().catch(console.error);
