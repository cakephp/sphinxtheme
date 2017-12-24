from os import path


def setup(app):
    root = path.abspath(path.dirname(__file__))
    theme_dir = path.join(root, 'themes')
    app.add_html_theme('cakephp', path.join(theme_dir, 'cakephp'))
    app.add_html_theme('cakephp-epub', path.join(theme_dir, 'cakephp-epub'))
