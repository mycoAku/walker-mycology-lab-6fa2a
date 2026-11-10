# Editing the Walker Mycology Lab website

The site uses Sveltia CMS with GitHub authentication. The editor and its content
are prepared locally, but GitHub login and publishing must be configured and
tested on the deployed Netlify site before anyone relies on them.

## What the editor manages

Open `/admin/` on the deployed site and sign in with a GitHub account that has
write access to the connected repository. Open **Website content**, then
**Members, news and resources**.

- **Lab members:** add, remove, reorder, and edit PhD, MSc, Honours,
  undergraduate trainee, and Alumni profiles. Choose **Alumni** in a member's
  category to move that profile. Edit the role and biography as needed.
- **Photos:** upload or replace profile photos, news images, archive images,
  resource logos, and member artwork. The photo crop field offers three
  positions.
- **News:** add, remove, reorder, or edit stories, their links and images.
  Choose whether each story appears on the homepage and/or the news page.
- **Archive spotlights**, **resources**, and the four **contact page links**:
  add or edit the available entries and links.

Use the formatting buttons for bold and italic text. Save commits the entire
content file to GitHub. Netlify then builds and publishes the change; the live
site may take a few minutes to update. Check Netlify's deploy status if it does
not appear. Editors can also change the whole repository, not just content, so
grant access only to trusted people.

The principal investigator and management layouts, former staff, research
associates, publications, other contact content, and photo galleries are not yet
managed by these forms. Kendra's existing custom PhD layout is retained when
her special layout setting is selected. If she is moved to another category,
her standard member card is shown instead.

The old photo selectors on the public page only preview a photo temporarily.
Use the admin editor for the supported photos; public-page selections do not
save or publish. Likewise, the legacy on-page text editor is not a publishing
tool.

## One-time deployment and login setup

1. In Netlify, verify that `walker-mycology-lab.netlify.app` is connected to
   `mycoAku/walker-mycology-lab-6fa2a` and confirm its production branch.
   The build command is `python3 tools/build_content.py`; the publish directory
   is the repository root (`.`). These settings are also in `netlify.toml`.
2. With the owner's approval, commit and push the website changes, including
   `content/website.json`, `content.generated.js`, and uploaded images. Verify
   that Netlify completes the deploy.
3. In GitHub, create an OAuth app under **Settings → Developer settings →
   OAuth Apps**. Set its homepage to the production site URL and its
   authorization callback URL to `https://api.netlify.com/auth/done`.
4. In Netlify, open **Project configuration → Security → OAuth**, install the
   GitHub provider, and enter the app's client ID and client secret there.
   Never commit the secret or share it in chat.
5. Grant each trusted editor write access to the repository. Open the production
   site's `/admin/`, sign in with GitHub, and authorize the app. A successful
   sign-in alone is not sufficient: save a test change and verify the resulting
   Netlify deployment and public site in another browser. Remove the test
   content afterwards and verify the removal.

If the actual connected repository or branch differs, update `admin/config.yml`
before deploying. Branch protection that prevents direct commits may prevent
the editor from saving; configure a compatible publishing workflow instead of
bypassing protections.

References: [Netlify OAuth setup](https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/)
and [Sveltia CMS GitHub authentication](https://sveltiacms.app/en/docs/backends/github).

## Local development

Run `python3 tools/build_content.py` after changing `content/website.json`
locally. This regenerates `content.generated.js`, allowing the website to be
opened directly as a file as well as served over HTTP. Netlify runs the same
command during deployment. A build stops with an error if required content or
links are invalid, rather than silently publishing invalid content.

Run the content checks with `python3 -m unittest discover -s tools -p 'test_*.py'`.
The real GitHub login does not work from a `file://` preview.
