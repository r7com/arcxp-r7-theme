/**
 * get section info.
 * @description get section info using fork from arc codebase
 * @link https://github.com/WPMedia/arc-themes-blocks/blob/arc-themes-release-version-2.0.3/blocks/overline-block/features/overline/default.jsx
 * @author Arc Themes Block
 * @param {object} globalContent - get from useFusionContext.
 * @param {string} arcSite - get from useFusionContext.
 */
export function getSectionInfo(globalContent, arcSite) {
  const {
    display: labelDisplay,
    url: labelUrl,
    text: labelText,
  } = (globalContent?.label && globalContent?.label.basic) || {}
  const shouldUseLabel = !!labelDisplay

  const { _id: sectionUrl, name: sectionText } =
    (globalContent?.websites &&
      globalContent.websites[arcSite] &&
      globalContent.websites[arcSite].website_section) ||
    {}

  // Default to websites object data
  let [text, url] = [sectionText, sectionUrl]

  if (globalContent?.owner?.sponsored) {
    text = globalContent?.label?.basic?.text
    url = null
  } else if (shouldUseLabel) {
    ;[text, url] = [labelText, labelUrl]
  }

  return {
    sectionName: text,
    sectionUrl: url,
  }
}
