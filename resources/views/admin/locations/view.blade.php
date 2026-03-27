@extends('layouts.admin')

@section('title')
    Locations &rarr; View &rarr; {{ $location->short }}
@endsection

@section('content-header')
    <h1>{{ $location->short }}<small>{{ str_limit($location->long, 75) }}</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li><a href="{{ route('admin.locations') }}">Locations</a></li>
        <li class="active">{{ $location->short }}</li>
    </ol>
@endsection

@section('content')
@php
    $pageData = [
        'action' => route('admin.locations.view', $location->id),
        'location' => [
            'id' => $location->id,
            'long' => $location->long,
            'short' => $location->short,
        ],
        'nodes' => $location->nodes->map(function ($node) {
            return [
                'fqdn' => $node->fqdn,
                'id' => $node->id,
                'name' => $node->name,
                'servers' => $node->servers->count(),
                'viewUrl' => route('admin.nodes.view', $node->id),
            ];
        })->values(),
    ];
@endphp
<div
    id="admin-page-root"
    data-page="location-view"
    data-props='@json($pageData)'
></div>
@endsection
