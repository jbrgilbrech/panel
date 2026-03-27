@extends('layouts.admin')

@section('title')
    Application API
@endsection

@section('content-header')
    <h1>Application API<small>Create a new application API key.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li><a href="{{ route('admin.api.index') }}">Application API</a></li>
        <li class="active">New Credentials</li>
    </ol>
@endsection

@section('content')
    @php
        $pageData = [
            'action' => route('admin.api.new'),
            'permissions' => $permissions,
            'resources' => $resources,
        ];
    @endphp
    <div
        id="admin-page-root"
        data-page="api-create"
        data-props='@json($pageData)'
    ></div>
@endsection
