#!/bin/bash -
#===============================================================================
#
#          FILE: fill_db.sh
#
#         USAGE: ./fill_db.sh
#
#   DESCRIPTION:
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Raziel Carvajal-Gomez (), raziel.carvajal@uclouvain.be
#  ORGANIZATION:
#       CREATED: 04/19/2018 20:24
#      REVISION:  ---
#===============================================================================
url=${1}
lines=`wc -l users.json | awk '{print $1}'`
i=0
while [ ${i} -le ${lines} ] ; do
  doc=`head -${i} users.json | tail -1`
  curl -s -X POST --data "${doc}" -H "Content-Type: application/json"  ${url} -o /dev/null
  let i=i+1
done
