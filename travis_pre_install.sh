#!/bin/sh
nl ./package.json | sed '/"rpio": "^0.9.11"/d' > ./package.json
