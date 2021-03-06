---
title: "What is Spectro Cloud?"
metaTitle: "About Spectro Cloud"
metaDescription: "Most important concepts of Spectro Cloud"
icon: ""
hideToC: true
fullWidth: false
---

import WarningBox from '@librarium/shared/src/components/WarningBox';

# What is Spectro Cloud?

Spectro Cloud’s SaaS based product brings the managed Kubernetes experience to users' own unique enterprise Kubernetes infrastructure stacks running in any public cloud, or private cloud environments, allowing users to not have to trade-off between flexibility and manageability. Spectro Cloud provides an as-a-service experience to users by automating the deployment, management, and maintenance of multiple Kubernetes clusters based on user defined Kubernetes infrastructure stacks.

Spectro Cloud consists of three main components: the SaaS management component, a Registry and Repository, and the managed clusters themselves. Spectro Cloud provides default Registries and repositories. Users can also host custom registeries and repositeries. Repositories host Kubernetes infrastructure stack components and versions.

The Spectro Cloud SaaS component is the “multi tenant  nerve center” of Spectro Cloud deployments. This component is a cloud based offer that provides central visibility and management of Spectro Cloud Kubernetes deployments. It provides a single pane of glass for users to define composable Kubernetes cluster profile templates, deploy and manage Kubernetes clusters with full visibility in multi-cloud environments, as well as manage the governance policies to control who can do what, when and where.

A Spectro Cloud managed Kubernetes cluster contains two main components - the Kubernetes tenant cluster, as well as a Spectro Cloud Management Agent. The Spectro Cloud Management Agent is responsible for:

* Communicating with the SaaS platform for heartbeat, cluster status and system metrics.
* Taking commands from the SaaS platform for checking cluster desired state changes and updating clusters to conform with the desired state.

![spectro_cloud](/spectro_cloud.png)
