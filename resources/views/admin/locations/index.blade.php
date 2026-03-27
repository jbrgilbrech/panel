@extends('layouts.admin')

@section('title')
    Locations
@endsection

@section('content-header')
    <h1>Locations<small>All locations that nodes can be assigned to for easier categorization.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Locations</li>
    </ol>
@endsection

@section('content')
@php
    $pageData = [
        'createAction' => route('admin.locations'),
        'locations' => collect($locations)->map(function ($location) {
            return [
                'id' => $location->id,
                'long' => $location->long,
                'nodes' => $location->nodes_count,
                'servers' => $location->servers_count,
                'short' => $location->short,
                'viewUrl' => route('admin.locations.view', $location->id),
            ];
        })->values(),
    ];
@endphp
<div
    id="admin-page-root"
    data-page="locations-index"
    data-props='@json($pageData)'
></div>
@endsection
