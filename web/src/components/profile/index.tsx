import React from 'react'
import './style.less'
import { ImgLazy } from '../img-lazy'
import { IconFont } from '../../iconfont'
import { isInVscode } from '@saber2pr/vscode-webview'
import { i18n } from '../../i18n'

export type Links = Array<{
  name: string
  href: string
}>

export interface Profile {
  imgSrc: string
  name: string
  target: string
  birth: string
  location: string
  school: string
  mobile: string
  mail: string
  workLinks: Links
  socialLinks: Links
  onLangChange?(lang: any): void
}

export const Profile = ({
  imgSrc,
  name,
  target,
  birth,
  location,
  school,
  mail,
  mobile,
  workLinks,
  socialLinks,
  onLangChange,
}: Profile) => (
  <div className="Profile">
    {isInVscode && (
      <div
        className="printer-link"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <a
          href={`https://saber2pr.top/vsc-profile-viewer/?lang=${i18n.language}`}
        >
          {i18n.format('gotoPrint')}
        </a>
        <select
          value={i18n.language}
          style={{ marginLeft: 8 }}
          onChange={event => {
            onLangChange && onLangChange(event.target.value as any)
          }}
        >
          <option value="zh-cn">中文</option>
          <option value="en">English</option>
        </select>
      </div>
    )}
    <ul>
      <li>
        <ImgLazy
          defaultClassName="Profile_DefaultImg"
          className="Profile_Img"
          src={imgSrc}
          alt={name}
        />
      </li>
    </ul>

    <ul className="Profile_Head">
      <li>
        <h1>{name}</h1>
      </li>
      <li>
        <p>
          <strong>
            {i18n.format('qiuzhi')}：{target}
          </strong>
        </p>
      </li>
    </ul>

    <ul className="Profile_Main">
      <li>
        <p>
          <IconFont.Birth />
          {i18n.format('birth')}：{birth}
        </p>
      </li>
      <li>
        <p>
          <IconFont.Location />
          {i18n.format('location')}：{location}
        </p>
      </li>
      <li>
        <p>
          <IconFont.School />
          {i18n.format('school')}：{school}
        </p>
      </li>
      <li>
        <p>
          <IconFont.Phone />
          {i18n.format('phone')}：{mobile}
        </p>
      </li>
      <li>
        <p>
          <IconFont.Mail />
          {i18n.format('email')}：{mail}
        </p>
      </li>
    </ul>

    <ul>
      <li>
        <dl>
          <dt>
            <h3>
              <span className="Profile_Border">
                <IconFont.Github />
                {i18n.format('personProject')}
              </span>
            </h3>
          </dt>

          {workLinks.map(({ name, href }) => (
            <dd key={name}>
              <a href={href}>
                <strong>{name}</strong>
              </a>
            </dd>
          ))}
        </dl>
      </li>

      <li style={{ marginTop: '32px' }}>
        <dl>
          <dt>
            <h3>
              <span className="Profile_Border">
                <IconFont.Blog />
                {i18n.format('social')}
              </span>
            </h3>
          </dt>

          {socialLinks.map(({ name, href }) => (
            <dd key={name}>
              <a href={href}>
                <strong>{name}</strong>
              </a>
            </dd>
          ))}
        </dl>
      </li>
    </ul>
  </div>
)
