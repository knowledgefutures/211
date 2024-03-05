# 211

**What's the 2-1-1?**

211s are short, simple descriptions of an idea that are no more than 211 words long, and use only the 2^11 most common english words.

The goal isn't to make it impossible or a big challenge to write. We just want a gut check on how much jargon we're using, and a nudge towards writing more simply.

This focuses on word count over character count because the abbreviations you see on twitter inhibit comprehension more than aid.

**Next Steps**

- Originally the editor was quickly built as simple flat html/js files. This worked fine for the editor, but I then decided to add in 'Posts', and the management of that as flat HTML is brittle. If we wind up using this, we'll want a cleaner way to add simple markdown files that we can build into a post directory, and auto-populate the Post listing on the landing page. The simplest path is probably just to pick a templating framework and add a couple config/layout files.
