failed=0

npx eslint . || failed=1
npx prettier --check . || failed=1

exit $failed
