---
title: 'Fluentbit'
metaTitle: 'Fluentbit'
metaDescription: 'Fluentbit Monitoring pack in Spectro Cloud'
hiddenFromNav: true
isIntegration: true
category: ['monitoring']
logoUrl: 'https://raw.githubusercontent.com/spectrocloud/pax/3890a6c1a85c8e791bee741d50284d4318cfb94d/stable/loggging_and_monitoring/fluent-bit/logo.png?token=APOFE6S4ZG33KEZM37EUZTS67GEZW'
---

import WarningBox from '@librarium/shared/src/components/WarningBox';

# Fluentbit

Fluent-Bit is a multi-platform log forwarder. The default integration will help forward logs from the Kubernetes cluster to an external ElasticSearch cluster

## Contents

Fluent-Bit is installed as a DaemonSet & so, an instance of fluent-bit will be running on all the nodes in the cluster.

## References

https://github.com/helm/charts/tree/master/stable/fluent-bit
