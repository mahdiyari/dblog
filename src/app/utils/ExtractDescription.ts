/*
* Source: steemit/condenser
* Link: https://github.com/steemit/condenser/blob/master/src/app/utils/ExtractContent.js
* (modified)
*/
import remarkableStripper from './RemarkableStripper'
import sanitize from 'sanitize-html'
import { htmlDecode } from './Html'
import Remarkable from 'remarkable'

const remarkable = new Remarkable({ html: true, linkify: false })

export default function extractDescription(body) {
  let desc
  if (!desc) {
    // Short description.
    // Remove bold and header, etc.
    // Stripping removes links with titles (so we got the links above)..
    // Remove block quotes if detected at beginning of comment preview if comment has a parent
    const body2 = remarkableStripper.render(
      body.replace(/(^(\n|\r|\s)*)>([\s\S]*?).*\s*/g, '')
    )
    desc = sanitize(body2, { allowedTags: [] }); // remove all html, leaving text
    desc = htmlDecode(desc);

    // Strip any raw URLs from preview text
    desc = desc.replace(/https?:\/\/[^\s]+/g, '');

    // Grab only the first line (not working as expected. does rendering/sanitizing strip newlines?)
    desc = desc.trim().split('\n')[0];

    if (desc.length > 140) {
        desc = desc.substring(0, 140).trim();
        const dotSpace = desc.lastIndexOf('. ');
        if (dotSpace > 80) {
            desc = desc.substring(0, dotSpace + 1);
        } else {
            // Truncate, remove the last (likely partial) word (along with random punctuation), and add ellipses
            desc = desc
                .substring(0, 100)
                .trim()
                .replace(/[,!\?]?\s+[^\s]+$/, '…');
        }
    }
  }
  return desc
}