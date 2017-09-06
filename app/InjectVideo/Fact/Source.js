import React from "react"
import upperCase from "voca/upper_case"
import { siteName, articleTitle, sourceLink } from './Source.css'


const getHostName = url =>
  upperCase(url.replace(/https?:\/\//, "").replace(/\/.*/g, ""))

const Source = ({source: {url, title, site_name}}) => (
  <a href={url} target="_BLANK" className={sourceLink}>
    <span className={siteName}>
      { upperCase(site_name) || getHostName(url) }
    </span>
    <span className={articleTitle}>{title}</span>
  </a>
)

export default Source