# CakePHP Sphinx Theme

[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.txt)

This is the sphinx theme used for the official CakePHP documentation projects.
It helps create HTML, PDF, and EPUB formats consistently across all the CakePHP
projects and branches.

You can see this theme in action at https://book.cakephp.org

For the actual CakePHP documentation see
[cakephp/docs](https://github.com/cakephp/docs).


## Developing/Testing changes to this theme

Working with this theme requires you to have sphinx installed in a virtualenv.
Lets assume you want to test some theme changes out with cakephp/docs.

```bash
# Clone the docs
git clone git@github.com:cakephp/docs cake_docs
cd cake_docs

# Create a virtualenv
virtualenv env

# Activate the virtual env.
. env/bin/activate

# Install sphinx and other dependencies.
pip install -r requirements.txt

cd ../

# Clone this theme.
git clone git@github.com/cakephp/sphinxtheme
cd sphinxtheme

# Install cakephpsphinx as an 'editable' package.
pip install -e .
```

You should now be able to preview changes to your docs theme by rebuilding the
documentation.

## Publishing Releases

1. Update `__version__` in setup.py
2. Commit changes to `setup.py`
3. Create a new tag
4. Publish a wheel `python setup.py bdist_wheel upload`

## Option 2 - Developing/Testing changes to this theme

If you prefer to stay within github universe and provide changes via pull requests, you can do
```bash
# Go to target directory, where you want clone cakephp/docs and cakephp/sphinxtheme into
# In our case we do it in the users home directory 
cd ~

# Clone the docs (follow installation guidelines of cakephp/docs)
# Note/recommendation: better work with your own fork of cakephp/docs 

git clone git@github.com:cakephp/docs
cd cake_docs

# Install sphinx and other requirements for cakephp/docs
pip install -r requirements.txt
```

This will install also cakespinx theme as python distribution package in your /usr/local/lib/<python>/dist-packages/cakephpsphinx. 
We come back to it in the later step.

```bash
# Clone the cakephp sphinx theme
# Note/recommendation: better work with your own fork of cakephp/sphinxtheme
cd ~
git clone git@github.com:cakephp/sphinxtheme

# Link clone of sphinxtheme with cakephp/docs
cd /usr/local/lib/<pyhton>/dist-packages/cakephpsphinx/themes 
ln -s ~/cakephpsphinx/themes themes
```

Now you can change the theme as well the cakephp docs.
The build command (e.g. make html-en) in cakephp will use your theme files of your local cakephp/sphinxtheme repository. You can push your changes and create pull-requests for cakephp/docs and cakephp/sphinxtheme via github.

## License

[MIT License](LICENSE)
