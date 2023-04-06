# Fuel-guides-template
		# run from parent
		chmod +x ./guide/generate-docs.sh
		./guide/generate-docs.sh ./GUIDE.MD ./guide		

		➜  learnsway-marketplace git:(main) ✗ chmod +x ./guide/generate-docs.sh
                ./guide/generate-docs.sh ./README.md ./guide

TODO: add desc for generate-docs


# How to

### Secrets url: 
	github.com/$user/$repo/settings/secrets/actions

1. Add VERCEL_ORG_ID secret

		Your "Org ID" is also called your user ID, and it's found at vercel.com/account > settings > general -- at the bottom

2. Add VERCEL_PROJECT_ID secret

		Your "Project ID" is found at vercel.com/dashboard > your project name > settings > general -- at the bottom	

3. Add generate-docs.yaml action

4. Add submodule into repository root 
			
		git submodule add git@github.com:cold-briu/fuel-guides-template.git 

3. push
