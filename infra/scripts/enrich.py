'''
Enrich the original markdown file so that it has a proper structure and metadata
to be consumed by the frontend.
'''

import frontmatter
from datetime import datetime
import sys
import os

now = datetime.utcnow()

if len(sys.argv) < 2:
  print("Usage: python enrich.py <file_path>")
  sys.exit(1)

file_path = sys.argv[1]

if not os.path.exists(file_path):
  print(f"File {file_path} does not exist.")
  sys.exit(1)

if not file_path.endswith('.md'):
  print(f"File {file_path} is not a markdown file.")
  sys.exit(1)

markdown_string = open(file_path).read()

content = frontmatter.loads(markdown_string)

print(content)

title = content['title']
tags = content['tags']

additional_info = {
  'date': now.isoformat(),
  'coverImage': f'https://source.unsplash.com/collection/random/1920x1080/?{tags[0]}',
  'author': {
    'name': 'Blue Inkwell Jr.',
    'picture': "/assets/blog/authors/blueinkwell.jpeg"
  },
  'ogImage': {
    'url': f"https://source.unsplash.com/collection/random/1920x1080/?{tags[0]}"
  }
}

content.metadata.update(additional_info)

# cut off content only to the first ---
content.content = content.content.split('---')[0]

# lower case the title
dest = '../../_posts/' + title.replace(' ', '-') + '.md'
dest = dest.lower()
if os.path.exists(dest):
    
    dest = '../../_posts/' + title.replace(' ', '-') + '-' + now.strftime('%Y-%m-%d') + '.md'
    dest = dest.lower()

with open(dest, 'w') as f:
  f.write(frontmatter.dumps(content))