#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${GEOIP_ACCOUNTID}" ]]; then
  echo "GEOIP_ACCOUNTID is blank, account id is required."
  exit 1
fi

if [[ -z "${GEOIP_LICENSE}" ]]; then
  echo "GEOIP_LICENSE is blank, license is required"
  exit 1
fi

GEOIP_STATELESS_BUCKET="planet4-assets"
GEOIP_FOLDER="/usr/share/GeoIP"
GEOP_CONFIG="/etc/GeoIP.conf"

dockerize -template "$GEOIP_CONFIG.tmpl:$GEOIP_CONFIG"

# Update GeoIP data and upload them
/usr/bin/geoipupdate -v
mkdir -p $GEOIP_FOLDER
gcloud storage rsync ${GEOIP_FOLDER} gs://"${GEOIP_STATELESS_BUCKET}/GeoIP/" --recursive
