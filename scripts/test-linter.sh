#!/bin/bash



source ./scripts/lint-changelog.sh "$(cat ./scripts/changelog.md | sed 's/$/\\n/' | tr -d '\n')"