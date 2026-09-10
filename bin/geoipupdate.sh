#!/usr/bin/env bash
set -euo pipefail

GEOIP_STATELESS_BUCKET="planet4-assets"
GEOIP_FOLDER="/usr/share/GeoIP"

# Update GeoIP data and upload them
mkdir -p $GEOIP_FOLDER
/usr/bin/geoipupdate -v
if [[ -f "${GEOIP_FOLDER}/GeoLite2-Country.mmdb" && -f "${GEOIP_FOLDER}/GeoLite2-City.mmdb" ]]; then
  gcloud storage rsync ${GEOIP_FOLDER} gs://"${GEOIP_STATELESS_BUCKET}/GeoIP" --recursive
fi
