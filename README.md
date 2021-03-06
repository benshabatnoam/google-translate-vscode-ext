<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/benshabatnoam/google-translate-vscode-ext/master/assets/icons/icon.ico">
  <br>
  Google Translate
</h1>
<h2 align="center">Translate your code using Google Translate.</a>
</h2>
<p align="center">
  <a href="https://travis-ci.org/benshabatnoam/google-translate-vscode-ext"><img src="https://travis-ci.org/benshabatnoam/google-translate-vscode-ext.svg?branch=master" alt="Travis CI"></a>
  <a href="https://github.com/benshabatnoam/google-translate-vscode-ext/releases"><img src="https://img.shields.io/github/release/benshabatnoam/google-translate-vscode-ext.svg" alt="version"></a>
</p>

## Installation
1. Install the extension.
2. Configure desired *'translate to'* language/s in user settings configuration - `googleTranslateExt.languages` (see language code table below).

## How to use
Select the text that your want to translate and execute `Translate` command.
> Tip: Use the shortcut `Ctrl+Shift+t` to translate the selected text.

## Features
* <u>Multi Languages:</u><br>Translate your code to multi languages simply by adding the desired language code to `googleTranslateExt.languages` string array configuration.
* <u>Replace Text</u>:<br>Replace selected text with translated text by configuring `googleTranslateExt.replaceText` to 'true'.
* <u>Multi Cursor</u>:<br>Translate/Replace selected text in each selected cursor's text.
* <u>Multiline</u>:<br>When selected text is multiline, each line will be translate separately.

## Language code table
<table>
<thead>
<tr>
<th>Language</th>
<th>ISO-639-1 Code</th>
</tr>
</thead>
<tbody>
<tr>
<td>Afrikaans</td>
<td>af</td>
</tr>
<tr>
<td>Albanian</td>
<td>sq</td>
</tr>
<tr>
<td>Amharic</td>
<td>am</td>
</tr>
<tr>
<td>Arabic</td>
<td>ar</td>
</tr>
<tr>
<td>Armenian</td>
<td>hy</td>
</tr>
<tr>
<td>Azeerbaijani</td>
<td>az</td>
</tr>
<tr>
<td>Basque</td>
<td>eu</td>
</tr>
<tr>
<td>Belarusian</td>
<td>be</td>
</tr>
<tr>
<td>Bengali</td>
<td>bn</td>
</tr>
<tr>
<td>Bosnian</td>
<td>bs</td>
</tr>
<tr>
<td>Bulgarian</td>
<td>bg</td>
</tr>
<tr>
<td>Catalan</td>
<td>ca</td>
</tr>
<tr>
<td>Cebuano</td>
<td>ceb (<a class="external" href="https://en.wikipedia.org/wiki/ISO_639-2">ISO-639-2</a>)</td>
</tr>
<tr>
<td>Chinese (Simplified)</td>
<td>zh-CN (<a class="external" href="https://tools.ietf.org/html/bcp47">BCP-47</a>)</td>
</tr>
<tr>
<td>Chinese (Traditional)</td>
<td>zh-TW (<a class="external" href="https://tools.ietf.org/html/bcp47">BCP-47</a>)</td>
</tr>
<tr>
<td>Corsican</td>
<td>co</td>
</tr>
<tr>
<td>Croatian</td>
<td>hr</td>
</tr>
<tr>
<td>Czech</td>
<td>cs</td>
</tr>
<tr>
<td>Danish</td>
<td>da</td>
</tr>
<tr>
<td>Dutch</td>
<td>nl</td>
</tr>
<tr>
<td>English</td>
<td>en</td>
</tr>
<tr>
<td>Esperanto</td>
<td>eo</td>
</tr>
<tr>
<td>Estonian</td>
<td>et</td>
</tr>
<tr>
<td>Finnish</td>
<td>fi</td>
</tr>
<tr>
<td>French</td>
<td>fr</td>
</tr>
<tr>
<td>Frisian</td>
<td>fy</td>
</tr>
<tr>
<td>Galician</td>
<td>gl</td>
</tr>
<tr>
<td>Georgian</td>
<td>ka</td>
</tr>
<tr>
<td>German</td>
<td>de</td>
</tr>
<tr>
<td>Greek</td>
<td>el</td>
</tr>
<tr>
<td>Gujarati</td>
<td>gu</td>
</tr>
<tr>
<td>Haitian Creole</td>
<td>ht</td>
</tr>
<tr>
<td>Hausa</td>
<td>ha</td>
</tr>
<tr>
<td>Hawaiian</td>
<td>haw (<a class="external" href="https://en.wikipedia.org/wiki/ISO_639-2">ISO-639-2</a>)</td>
</tr>
<tr>
<td>Hebrew</td>
<td>iw</td>
</tr>
<tr>
<td>Hindi</td>
<td>hi</td>
</tr>
<tr>
<td>Hmong</td>
<td>hmn (<a class="external" href="https://en.wikipedia.org/wiki/ISO_639-2">ISO-639-2</a>)</td>
</tr>
<tr>
<td>Hungarian</td>
<td>hu</td>
</tr>
<tr>
<td>Icelandic</td>
<td>is</td>
</tr>
<tr>
<td>Igbo</td>
<td>ig</td>
</tr>
<tr>
<td>Indonesian</td>
<td>id</td>
</tr>
<tr>
<td>Irish</td>
<td>ga</td>
</tr>
<tr>
<td>Italian</td>
<td>it</td>
</tr>
<tr>
<td>Japanese</td>
<td>ja</td>
</tr>
<tr>
<td>Javanese</td>
<td>jw</td>
</tr>
<tr>
<td>Kannada</td>
<td>kn</td>
</tr>
<tr>
<td>Kazakh</td>
<td>kk</td>
</tr>
<tr>
<td>Khmer</td>
<td>km</td>
</tr>
<tr>
<td>Korean</td>
<td>ko</td>
</tr>
<tr>
<td>Kurdish</td>
<td>ku</td>
</tr>
<tr>
<td>Kyrgyz</td>
<td>ky</td>
</tr>
<tr>
<td>Lao</td>
<td>lo</td>
</tr>
<tr>
<td>Latin</td>
<td>la</td>
</tr>
<tr>
<td>Latvian</td>
<td>lv</td>
</tr>
<tr>
<td>Lithuanian</td>
<td>lt</td>
</tr>
<tr>
<td>Luxembourgish</td>
<td>lb</td>
</tr>
<tr>
<td>Macedonian</td>
<td>mk</td>
</tr>
<tr>
<td>Malagasy</td>
<td>mg</td>
</tr>
<tr>
<td>Malay</td>
<td>ms</td>
</tr>
<tr>
<td>Malayalam</td>
<td>ml</td>
</tr>
<tr>
<td>Maltese</td>
<td>mt</td>
</tr>
<tr>
<td>Maori</td>
<td>mi</td>
</tr>
<tr>
<td>Marathi</td>
<td>mr</td>
</tr>
<tr>
<td>Mongolian</td>
<td>mn</td>
</tr>
<tr>
<td>Myanmar (Burmese)</td>
<td>my</td>
</tr>
<tr>
<td>Nepali</td>
<td>ne</td>
</tr>
<tr>
<td>Norwegian</td>
<td>no</td>
</tr>
<tr>
<td>Nyanja (Chichewa)</td>
<td>ny</td>
</tr>
<tr>
<td>Pashto</td>
<td>ps</td>
</tr>
<tr>
<td>Persian</td>
<td>fa</td>
</tr>
<tr>
<td>Polish</td>
<td>pl</td>
</tr>
<tr>
<td>Portuguese (Portugal, Brazil)</td>
<td>pt</td>
</tr>
<tr>
<td>Punjabi</td>
<td>pa</td>
</tr>
<tr>
<td>Romanian</td>
<td>ro</td>
</tr>
<tr>
<td>Russian</td>
<td>ru</td>
</tr>
<tr>
<td>Samoan</td>
<td>sm</td>
</tr>
<tr>
<td>Scots Gaelic</td>
<td>gd</td>
</tr>
<tr>
<td>Serbian</td>
<td>sr</td>
</tr>
<tr>
<td>Sesotho</td>
<td>st</td>
</tr>
<tr>
<td>Shona</td>
<td>sn</td>
</tr>
<tr>
<td>Sindhi</td>
<td>sd</td>
</tr>
<tr>
<td>Sinhala (Sinhalese)</td>
<td>si</td>
</tr>
<tr>
<td>Slovak</td>
<td>sk</td>
</tr>
<tr>
<td>Slovenian</td>
<td>sl</td>
</tr>
<tr>
<td>Somali</td>
<td>so</td>
</tr>
<tr>
<td>Spanish</td>
<td>es</td>
</tr>
<tr>
<td>Sundanese</td>
<td>su</td>
</tr>
<tr>
<td>Swahili</td>
<td>sw</td>
</tr>
<tr>
<td>Swedish</td>
<td>sv</td>
</tr>
<tr>
<td>Tagalog (Filipino)</td>
<td>tl</td>
</tr>
<tr>
<td>Tajik</td>
<td>tg</td>
</tr>
<tr>
<td>Tamil</td>
<td>ta</td>
</tr>
<tr>
<td>Telugu</td>
<td>te</td>
</tr>
<tr>
<td>Thai</td>
<td>th</td>
</tr>
<tr>
<td>Turkish</td>
<td>tr</td>
</tr>
<tr>
<td>Ukrainian</td>
<td>uk</td>
</tr>
<tr>
<td>Urdu</td>
<td>ur</td>
</tr>
<tr>
<td>Uzbek</td>
<td>uz</td>
</tr>
<tr>
<td>Vietnamese</td>
<td>vi</td>
</tr>
<tr>
<td>Welsh</td>
<td>cy</td>
</tr>
<tr>
<td>Xhosa</td>
<td>xh</td>
</tr>
<tr>
<td>Yiddish</td>
<td>yi</td>
</tr>
<tr>
<td>Yoruba</td>
<td>yo</td>
</tr>
<tr>
<td>Zulu</td>
<td>zu</td>
</tr>
</tbody>
</table>

This table copied from [Google Cloud Platform - Language Support page](https://cloud.google.com/translate/docs/languages).

-----------------------------------------------------------------------------------------------------------

**Enjoy!**
