# Global configuration information used across all the
# translations of documentation.

# -- Required Configuration --------------------------------------------------

# The `version`, `version_name`, `release`, are `version_list`
# configration values are defined in the version specific branches.
#
# - `branch` The branch the current code can be found in github. eg. '3.0'
# - `version` Should contain the minor version number eg. '3.5'
# - `release` Should contain the minor version number eg. '3.5'
# - `version_name` Should contain the marketing name for
#   the release branch eg. 'Red Velvet'
# - `version_list` should contain a list of other versions to be made
#   available through the version picker in the top navigation.
# - `search_version` The search index prefix to use when querying
#   https://search.cakephp.org
# - `project` The project name to display in the header bar.
# - `show_root_link` Whether or not to show a back to cookbook link
# - `repository` The repository name. Defaults to cakephp/docs
# - `source_path` The path to the documentation in the repository 
#   ending in a /. Defaults to ''



# -- General configuration ---------------------------------------------------

# If your documentation needs a minimal Sphinx version, state it here.
import datetime
import os


# Add any Sphinx extension module names here, as strings.
# They can be extensions coming with Sphinx
# (named 'sphinx.ext.*') or your custom ones.
extensions = [
    'sphinx.ext.todo',
    'sphinxcontrib.phpdomain',
    'cakephpsphinx.config.cakei18n',
    'cakephpsphinx.config.release_context'
]

# Add any paths that contain templates here, relative to this directory.
# templates_path = []

# The suffix of source filenames.
source_suffix = '.rst'

# The master toctree document.
master_doc = 'contents'

# General information about the project.
project = u'CakePHP'
copyright = u'%d, Cake Software Foundation, Inc' % datetime.datetime.now().year


# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
exclude_patterns = [
    'themes',
    'cakephpsphinx'
]

# The reST default role (used for this markup: `text`) to
# use for all documents.
#default_role = None

# If true, '()' will be appended to :func: etc. cross-reference text.
#add_function_parentheses = True

# If true, the current module name will be prepended to all description
# unit titles (such as .. function::).
#add_module_names = True

# If true, sectionauthor and moduleauthor directives will be shown in the
# output. They are ignored by default.
#show_authors = False

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'

# A list of ignored prefixes for module index sorting.
#modindex_common_prefix = []

highlight_language = 'phpinline'


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
html_theme = 'cakephp'

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
#html_theme_options = {}

# The name for this set of Sphinx documents.  If None, it defaults to
# "<project> v<release> documentation".
#html_title = None

# A shorter title for the navigation bar.  Default is the same as html_title.
#html_short_title = None
html_short_title = u'Cookbook 3.x'

# The name of an image file (relative to this directory) to place at the top
# of the sidebar.
#html_logo = None

# The name of an image file (within the static path) to use as favicon of the
# docs.  This file should be a Windows icon file (.ico) being 16x16 or 32x32
# pixels large.
#html_favicon = None

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = []

# If not '', a 'Last updated on:' timestamp is inserted at every page bottom,
# using the given strftime format.
html_last_updated_fmt = '%b %d, %Y'

# If true, SmartyPants will be used to convert quotes and dashes to
# typographically correct entities.
#html_use_smartypants = True

# Custom sidebar templates, maps document names to template names.
html_sidebars = {
    '**': ['globaltoc.html', 'localtoc.html']
}

# Additional templates that should be rendered to pages, maps page names to
# template names.
#html_additional_pages = {}

# If false, no module index is generated.
#html_domain_indices = True

# If false, no index is generated.
#html_use_index = True

# If true, the index is split into individual pages for each letter.
#html_split_index = False

# If true, links to the reST sources are added to the pages.
#html_show_sourcelink = True

# If true, "Created using Sphinx" is shown in the HTML footer. Default is True.
#html_show_sphinx = True

# If true, "(C) Copyright ..." is shown in the HTML footer. Default is True.
#html_show_copyright = True

# If true, an OpenSearch description file will be output, and all pages will
# contain a <link> tag referring to it.  The value of this option must be the
# base URL from which the finished HTML is served.
#html_use_opensearch = ''

# This is the file name suffix for HTML files (e.g. ".xhtml").
#html_file_suffix = None

# Output file base name for HTML help builder.
htmlhelp_basename = 'CakePHPCookbookdoc'


# -- Options for LaTeX output ------------------------------------------------

latex_elements = {
    # The paper size ('letterpaper' or 'a4paper').
    #
    'papersize': 'letterpaper',

    # The font size ('10pt', '11pt' or '12pt').
    #
    'pointsize': '11pt',

    # Additional stuff for the LaTeX preamble.
    #
    # 'preamble': '',

    # Latex figure (float) alignment
    #
    # 'figure_align': 'htbp',
}

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title, author,
# documentclass [howto/manual]).
latex_documents = [
    ('pdf-contents', 'CakePHPCookbook.tex', u'CakePHP Cookbook Documentation',
     u'Cake Software Foundation', 'manual'),
]

# The name of an image file (relative to this directory) to place at the top of
# the title page.
latex_logo = os.path.dirname(__file__) + \
    os.path.sep + \
    '../themes/cakephp/static/pdf-logo.png'

# For "manual" documents, if this is true, then toplevel headings are parts,
# not chapters.
#latex_use_parts = False

# If true, show page references after internal links.
# latex_show_pagerefs = True

# If true, show URL addresses after external links.
latex_show_urls = 'footnote'

# Additional stuff for the LaTeX preamble.
#latex_preamble = ''

# Documents to append as an appendix to all manuals.
#latex_appendices = []

# If false, no module index is generated.
latex_domain_indices = True


preamb = ur'''
% Custom colors.
\definecolor{ChapterColor}{RGB}{201,36,52}
\definecolor{TitleColor}{RGB}{0,0,0}

% No section numbering
\setcounter{secnumdepth}{0}

% Make chapter titles red.
\ChNameVar{\color{TitleColor}\Large}
\ChNumVar{\color{TitleColor}\Large}
\ChTitleVar{\color{ChapterColor}\Huge\sf}

% link colors
\definecolor{InnerLinkColor}{RGB}{65,114,130}
\definecolor{OuterLinkColor}{RGB}{0,61,76}

% background and border for code examples.
\definecolor{VerbatimColor}{RGB}{242,242,242}
\definecolor{VerbatimBorderColor}{RGB}{230,230,230}

% Map specific problematic characters
\DeclareUnicodeCharacter{1EBD}{\~e}
'''

latex_elements = {
    'preamble': preamb,
    'fncychap': '\\usepackage[Sonny]{fncychap}'
}


# -- Options for manual page output ------------------------------------------

# One entry per manual page. List of tuples
# (source start file, name, description, authors, manual section).
man_pages = [
    ('index', 'cakephpcookbook', u'CakePHP Cookbook Documentation',
     [u'CakePHP'], 1)
]


# -- Options for Epub output -------------------------------------------------

# Bibliographic Dublin Core info.
# Epub title, author, and publisher are defined in the doc branch

epub_theme = 'cakephp-epub'

# A list of files that should not be packed into the epub file.
epub_exclude_files = [
    'index.html',
    'pdf-contents.html',
    'search.html',
    'contents.html'
]

# The depth of the table of contents in toc.ncx.
epub_tocdepth = 2

# Allow duplicate toc entries.
epub_tocdup = False

# If true, add an index to the epub document.
epub_use_index = False

# Hack to render the php source code without the <?php tag
from sphinx.highlighting import lexers
from pygments.lexers.web import PhpLexer

lexers['phpinline'] = PhpLexer(startinline=True)

rst_epilog = """
.. |minphpversion| replace:: 5.6.0
"""
