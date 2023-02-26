# Utility target for checking required parameters
guard-%:
	@if [ "$($*)" = '' ]; then \
		echo "Missing required $* variable."; \
		exit 1; \
	fi;

# Tasks to publish tag to GitHub and PyPi
.PHONY: tag-release publish-pypi release 

release: bump-version tag-release publish-pypi

bump-version: guard-VERSION
	@echo "Bumping version"
	# Work around sed being bad.
	mv setup.py setup.old
	cat setup.old | sed s'/[0-9]\.[0-9]\.[0-9]*/$(VERSION)/' > setup.py
	rm setup.old
	git add setup.py
	git commit -m "Update version number to $(VERSION)"

# Tag a release
tag-release: guard-VERSION
	@echo "Tagging $(VERSION) and publish tag"
	git tag -s $(VERSION) -m "CakePHP Sphinx Theme $(VERSION)"
	git push $(REMOTE)
	git push $(REMOTE) --tags

publish-pypi: guard-VERSION
	@echo "Publish to pypi"
	rm -r build
	rm -r dist
	python setup.py bdist_wheel sdist
	twine upload ./dist/*
