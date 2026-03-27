@extends('layouts.admin')

@section('title')
    Administration
@endsection

@section('content-header')
    <h1>Administrative Overview<small>A quick glance at your system.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Index</li>
    </ol>
@endsection

@section('content')
@php
    $pageData = [
        'currentVersion' => config('app.version'),
        'discordUrl' => $version->getDiscord(),
        'donationsUrl' => $version->getDonations(),
        'isLatest' => $version->isLatestPanel(),
        'latestVersion' => $version->isLatestPanel() ? null : $version->getPanel(),
    ];
@endphp
<div
    id="admin-page-root"
    data-page="overview"
    data-props='@json($pageData)'
></div>
@endsection
