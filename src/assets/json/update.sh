#~/bin/bash
# This script willl update all json files
`mongoexport --db minepm --collection bladdercancer --out bladder.json --jsonArray`
`mongoexport --db minepm --collection coloncancer --out colon.json --jsonArray`
`mongoexport --db minepm --collection pancreaticcancer --out pancreatic.json --jsonArray`
`mongoexport --db minepm --collection prostatecancer --out prostate.json --jsonArray`
`mongoexport --db minepm --collection lungcancer --out lung.json --jsonArray`
 
