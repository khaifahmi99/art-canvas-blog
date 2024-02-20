type Props = {
    tags: string[];
}

export function PostFooter({ tags }: Props) {
    const cleanedTags: string[] = tags.map(tag => 
      tag
        .replace(/\s/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toUpperCase()
    )

    return (
    <div className="max-w-2xl mx-auto">
        <div className="my-4 mx-2 flex flex-row space-x-2">
          {cleanedTags.map(tag => (
            <span key={tag} className="py-1 px-2 text-sm bg-blue-300 rounded-lg">
              <pre>
                <code>#{tag}</code>
              </pre>
            </span>
          ))}
        </div>
      </div>
    )
}