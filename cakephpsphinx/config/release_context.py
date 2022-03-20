"""
CakePHP theme extensions.

A simple sphinx extension that add branch and version
context to sphinx configuration and template context.
"""


def setup(app):
    app.connect('html-page-context', append_template_ctx)
    app.add_config_value('branch', '', True)
    app.add_config_value('repository', 'cakephp/docs', True)
    app.add_config_value('source_path', '', True)
    app.add_config_value('version_name', '', True)
    app.add_config_value('version_list', [], True)
    app.add_config_value('search_version', '', True)
    app.add_config_value('search_url', 'https://search.cakephp.org/search', True)
    app.add_config_value('show_root_link', False, True)
    app.add_config_value('is_prerelease', False, True)
    app.add_config_value('is_security', False, True)
    app.add_config_value('is_eol', False, True)
    app.add_config_value(
        'hide_page_contents',
        ('search', 'contents', 'index', '404'),
        True)


def append_template_ctx(app, pagename, templatename, ctx, event_arg):
    ctx['show_root_link'] = app.config.show_root_link
    ctx['branch'] = app.config.branch
    ctx['repository'] = app.config.repository
    ctx['source_path'] = app.config.source_path
    ctx['version_name'] = app.config.version_name
    ctx['version_list'] = app.config.version_list
    ctx['search_version'] = app.config.search_version
    ctx['search_url'] = app.config.search_url
    ctx['is_prerelease'] = app.config.is_prerelease
    ctx['is_security'] = app.config.is_security
    ctx['is_eol'] = app.config.is_eol
    ctx['hide_page_contents'] = app.config.hide_page_contents
