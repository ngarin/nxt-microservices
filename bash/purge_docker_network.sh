for i in ` docker network inspect -f '{{range .Containers}}{{.Name}} {{end}}' app_app-network`;\
  do \
     docker network disconnect -f app_app-network $i; \
  done;