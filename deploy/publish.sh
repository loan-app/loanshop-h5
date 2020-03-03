#!/usr/bin/env bash
npm run build:prod
NODE_ENV=production node deploy/tools/archive
iphost=47.96.*.*
targetDir=/var/www/html
scp  dist.zip root@$iphost:$targetDir
ssh root@$iphost  << EOF
    cd $targetDir;
    unzip -o -d dist dist.zip;
    exit;
EOF
