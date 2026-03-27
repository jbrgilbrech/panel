@extends('layouts.admin')

@section('title')
    Create User
@endsection

@section('content-header')
    <h1>Create User<small>Add a new user to the system.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li><a href="{{ route('admin.users') }}">Users</a></li>
        <li class="active">Create</li>
    </ol>
@endsection

@section('content')
@php
    $pageData = [
        'action' => route('admin.users.new'),
        'languages' => collect($languages)->map(function ($value, $key) {
            return ['key' => $key, 'value' => $value, 'selected' => config('app.locale') === $key];
        })->values(),
        'old' => [
            'email' => old('email'),
            'name_first' => old('name_first'),
            'name_last' => old('name_last'),
            'password' => old('password'),
            'username' => old('username'),
        ],
    ];
@endphp
<div
    id="admin-page-root"
    data-page="user-create"
    data-props='@json($pageData)'
></div>
@endsection
