#!/bin/sh
set -e

# running nginx in foreground
exec nginx -g 'daemon off;'