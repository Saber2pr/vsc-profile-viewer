import React, { useEffect } from 'react'

import {
  Profile,
  WorksView,
  TwoSide,
  Rate,
  Table,
  Comment,
} from '../../components'

import './style.less'
import { IconFont } from '../../iconfont'
import { i18n } from '../../i18n'

export interface View {
  data: {
    language: string
    margin: string
    profile: Profile
    worksexp: Delete<WorksView, 'icon'>
    opensource: Delete<WorksView, 'icon'>
    ability: Table
    rate: Comment
  }
}

type Delete<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export const View = ({ data }: View) => {
  const { profile, worksexp, opensource, rate, ability, margin, language } =
    data
  i18n.setLocal(language as any)

  useEffect(() => {
    document.body.style.margin = margin
  }, [margin])

  return (
    <main className="View">
      <TwoSide>
        <Profile {...profile} />
        <aside className="main">
          <WorksView {...opensource} icon={<IconFont.Npm />} />
          <WorksView {...worksexp} icon={<IconFont.Exp />} />
          <Table {...ability} />
          <Rate {...rate} />
        </aside>
      </TwoSide>
    </main>
  )
}
